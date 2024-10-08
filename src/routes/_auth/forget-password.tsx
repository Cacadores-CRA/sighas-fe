import { ForgetPasswordPage } from '@/pages/ForgetPassword/ForgetPassword';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/forget-password')({
  component: () => <ForgetPasswordPage />,
});
