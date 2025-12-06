'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Link,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Speed as SpeedIcon,
  History as HistoryIcon,
  Lightbulb as LightbulbIcon,
  Code as CodeIcon,
  Translate as TranslateIcon,
  AutoAwesome as AutoAwesomeIcon,
  CheckCircle as CheckCircleIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import NextLink from 'next/link';

// ============================================
// 型定義
// ============================================

/** 特徴カードのプロパティ */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** 使い方ステップのデータ */
interface StepData {
  label: string;
  description: string;
  icon: React.ReactNode;
}

// ============================================
// 定数データ
// ============================================

/** サービスの3つの特徴 */
const FEATURES: FeatureCardProps[] = [
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: '即時AIレビュー',
    description:
      'コードを貼り付けるだけで、Claude Haiku 4.5が数秒で詳細なフィードバックを提供。本業と両立しながら学習を進められます。',
  },
  {
    icon: <HistoryIcon sx={{ fontSize: 40 }} />,
    title: '学習履歴の蓄積',
    description:
      '過去のレビュー結果を自動保存。ポートフォリオ作成やインターン応募前の振り返りに最適です。',
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
    title: 'カテゴリ別の改善提案',
    description:
      'バグ・設計・パフォーマンス・アクセシビリティの観点で整理。何をどう直すべきか、コード例付きで具体的に提示します。',
  },
];

/** 使い方の4ステップ（ユーザージャーニーに対応） */
const STEPS: StepData[] = [
  {
    label: 'GitHubでログイン',
    description: 'GitHub/Googleアカウントで簡単に認証。面倒な登録は不要です。',
    icon: <GitHubIcon />,
  },
  {
    label: 'コードを入力',
    description: 'レビューしたいコードを貼り付け、言語を選択して送信します。',
    icon: <CodeIcon />,
  },
  {
    label: 'AIレビュー結果を確認',
    description: 'Claude Haiku 4.5が分析。問題点・改善例・参考リンクを確認できます。',
    icon: <AutoAwesomeIcon />,
  },
  {
    label: '修正して再レビュー',
    description: '指摘を参考にコードを修正。履歴比較で成長を実感しましょう。',
    icon: <LightbulbIcon />,
  },
];

/** フッターリンク */
const FOOTER_LINKS = {
  service: [
    { label: '利用規約', href: '/terms' },
    { label: 'プライバシーポリシー', href: '/privacy' },
  ],
  support: [
    { label: 'お問い合わせ', href: '/contact' },
    { label: 'ヘルプ', href: '/help' },
  ],
};

// ============================================
// サブコンポーネント
// ============================================

/**
 * ヘッダーコンポーネント
 * - デスクトップ: ロゴ + ログインボタン
 * - モバイル: ロゴ + ハンバーガーメニュー
 */
function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* ロゴ */}
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'text.primary',
            }}
          >
            <AutoAwesomeIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CodeMentor AI
            </Typography>
          </Box>

          {/* デスクトップナビゲーション */}
          {!isMobile ? (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                component={NextLink}
                href="/auth/signin"
              >
                ログイン
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={NextLink}
                href="/auth/signup"
              >
                無料で始める
              </Button>
            </Stack>
          ) : (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="メニューを開く"
                onClick={toggleDrawer(true)}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={NextLink}
                        href="/auth/signin"
                      >
                        <ListItemText primary="ログイン" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={NextLink}
                        href="/auth/signup"
                      >
                        <ListItemText primary="新規登録" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

/**
 * ヒーローセクション
 * - インパクトのあるキャッチコピー
 * - サービスの価値提案
 * - CTAボタン
 */
function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 8 },
        pb: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a1a2e 50%, ${theme.palette.background.default} 100%)`
            : `linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #f8fafc 100%)`,
        position: 'relative',
        overflow: 'hidden',
        // 装飾的な背景パターン
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, ${
            theme.palette.mode === 'dark'
              ? 'rgba(96, 165, 250, 0.1)'
              : 'rgba(37, 99, 235, 0.05)'
          } 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          {/* キャッチコピー */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            コードレビューを、
            <Box
              component="span"
              sx={{
                display: 'block',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AIと共に。
            </Box>
          </Typography>

          {/* サブタイトル */}
          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.7,
            }}
          >
            転職準備・インターン応募・ポートフォリオ改善に。
            <br />
            Claude Haiku 4.5が、プロの視点でコードを分析します。
          </Typography>

          {/* CTAボタン */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              component={NextLink}
              href="/auth/signup"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: (theme) =>
                  `0 4px 14px 0 ${theme.palette.primary.main}40`,
                '&:hover': {
                  boxShadow: (theme) =>
                    `0 6px 20px 0 ${theme.palette.primary.main}60`,
                },
              }}
            >
              無料で始める
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#features"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              詳しく見る
            </Button>
          </Stack>

          {/* 信頼性バッジ */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            alignItems="center"
            sx={{ mt: 4, opacity: 0.8 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" color="text.secondary">
                無料プランあり
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <GitHubIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">
                GitHub/Googleで簡単ログイン
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * 特徴カードコンポーネント
 */
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 8px 30px rgba(96, 165, 250, 0.15)'
              : '0 8px 30px rgba(37, 99, 235, 0.1)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2} alignItems="flex-start">
          {/* アイコン */}
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'primary.dark'
                  : 'primary.light',
              color:
                theme.palette.mode === 'dark'
                  ? 'primary.light'
                  : 'primary.dark',
            }}
          >
            {icon}
          </Avatar>

          {/* タイトル */}
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: 700, fontSize: '1.25rem' }}
          >
            {title}
          </Typography>

          {/* 説明 */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * 特徴セクション
 * - 3つの特徴をカードで表示
 */
function FeaturesSection() {
  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* セクションタイトル */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
              }}
            >
              CodeMentor AIの特徴
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500 }}
            >
              プログラミング学習を効率化する3つの機能
            </Typography>
          </Stack>

          {/* 特徴カード */}
          <Grid container spacing={3}>
            {FEATURES.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * 使い方ステップセクション
 * - 3ステップの操作フロー
 */
function StepsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'background.paper'
            : 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* セクションタイトル */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
              }}
            >
              使い方は簡単4ステップ
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500 }}
            >
              ログインから学習・修正まで、数分で完結します
            </Typography>
          </Stack>

          {/* ステッパー */}
          <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
            <Stepper
              orientation={isMobile ? 'vertical' : 'horizontal'}
              activeStep={-1}
              sx={{
                '& .MuiStepConnector-line': {
                  borderColor: 'primary.main',
                  borderTopWidth: 2,
                },
              }}
            >
              {STEPS.map((step, index) => (
                <Step key={index} active>
                  <StepLabel
                    StepIconComponent={() => (
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    )}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, fontSize: '1rem' }}
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                  {isMobile && (
                    <StepContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: 2 }}
                      >
                        {step.description}
                      </Typography>
                    </StepContent>
                  )}
                </Step>
              ))}
            </Stepper>

            {/* デスクトップ時の説明文 */}
            {!isMobile && (
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {STEPS.map((step, index) => (
                  <Grid item xs={3} key={index}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ px: 1 }}
                    >
                      {step.description}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * CTAセクション
 * - ログイン・新規登録への最終誘導
 */
function CTASection() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.primary.dark}20 0%, ${theme.palette.secondary.dark}20 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.light}40 0%, ${theme.palette.secondary.light}40 100%)`,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
              }}
            >
              今すぐ始めて、
              <br />
              コードを改善しよう
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              GitHub・Googleアカウントで簡単ログイン。
              <br />
              無料で今すぐAIコードレビューを体験できます。
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: '100%', maxWidth: 400 }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                component={NextLink}
                href="/auth/signin"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                ログイン
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                component={NextLink}
                href="/auth/signup"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                新規登録
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

/**
 * フッターコンポーネント
 */
function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'background.paper'
            : 'grey.900',
        color:
          theme.palette.mode === 'dark'
            ? 'text.primary'
            : 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* ブランド情報 */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon
                  sx={{ fontSize: 28, color: 'primary.main' }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  CodeMentor AI
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  maxWidth: 280,
                }}
              >
                プログラミング学習者のための
                AIコードレビューサービス
              </Typography>
              <IconButton
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ width: 40, alignSelf: 'flex-start' }}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* サービスリンク */}
          <Grid item xs={6} md={4}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              サービス
            </Typography>
            <Stack spacing={1}>
              {FOOTER_LINKS.service.map((link) => (
                <Link
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: 'inherit',
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* サポートリンク */}
          <Grid item xs={6} md={4}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              サポート
            </Typography>
            <Stack spacing={1}>
              {FOOTER_LINKS.support.map((link) => (
                <Link
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: 'inherit',
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* コピーライト */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: 1,
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} CodeMentor AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================
// メインページコンポーネント
// ============================================

/**
 * ランディングページ
 *
 * 構成:
 * - Header: ナビゲーション
 * - HeroSection: キャッチコピー + CTA
 * - FeaturesSection: サービスの3つの特徴
 * - StepsSection: 使い方の3ステップ
 * - CTASection: 最終誘導
 * - Footer: フッター情報
 */
export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <CTASection />
      </main>
      <Footer />
    </Box>
  );
}

