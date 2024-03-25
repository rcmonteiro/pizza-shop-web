import { Link, useRouteError } from 'react-router-dom'

export const Error = () => {
  const error = useRouteError() as Error

  return (
    <div className={`flex h-screen flex-col items-center justify-center gap-2`}>
      <h1 className="text-4xl font-bold">Oops...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu ao acessar a página, seguem os detalhes:
      </p>
      <pre className="rounded-sm border bg-slate-700 p-8">
        {error?.message || JSON.stringify(error)}
      </pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
