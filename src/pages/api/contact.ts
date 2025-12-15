import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import dbConnect from '../../lib/dbConnect';
import Contact from '../../models/Contact';

type Data = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }

  await dbConnect();

  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: '全ての項目を入力してください。' });
    }

    // Email format validation (simple check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: '有効なメールアドレスを入力してください。' });
    }

    // Sanitize input
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      subject: sanitizeHtml(subject),
      message: sanitizeHtml(message),
    };

    // Save to Database
    const contact = await Contact.create(sanitizedData);

    // Send Email
    // Nodemailer transporter setup
    // Note: In a real production app, use environment variables for all credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${sanitizedData.name}" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.ADMIN_EMAIL, // List of receivers
      replyTo: sanitizedData.email,
      subject: `[お問合せ] ${sanitizedData.subject}`, // Subject line
      text: `
名前: ${sanitizedData.name}
メールアドレス: ${sanitizedData.email}
件名: ${sanitizedData.subject}

メッセージ:
${sanitizedData.message}
      `, // plain text body
      html: `
<h3>新しいお問合せがありました</h3>
<p><strong>名前:</strong> ${sanitizedData.name}</p>
<p><strong>メールアドレス:</strong> ${sanitizedData.email}</p>
<p><strong>件名:</strong> ${sanitizedData.subject}</p>
<p><strong>メッセージ:</strong><br/>${sanitizedData.message.replace(/\n/g, '<br/>')}</p>
      `, // html body
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // DBには保存されているので、クライアントには成功として返しつつ、メール送信失敗をログに残すなどの対応
        // ここではエラーとして扱わず、成功として返すが、警告を含めることも可能
        // return res.status(500).json({ success: true, message: '送信されましたが、管理者への通知メール送信に失敗しました。', data: contact });
    }

    res.status(201).json({ success: true, message: 'お問合せを受け付けました。', data: contact });

  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'サーバーエラーが発生しました。時間を置いて再度お試しください。' });
  }
}
