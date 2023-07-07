import AuthForm from "./components/AuthForm"

export default function Home() {
  return (
    <main className="min-h-full w-full px-12 flex flex-col items-center justify-center gap-6">
      <h2 className="text-center text-xl font-bold">Sign in to your account!</h2>
      <AuthForm />
    </main>
  )
}
