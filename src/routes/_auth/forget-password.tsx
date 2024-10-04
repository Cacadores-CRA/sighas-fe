import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forget-password')({
  component: () => <div>Hello /_auth/forget-password!</div>,
})
