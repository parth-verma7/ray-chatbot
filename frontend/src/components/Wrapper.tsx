import React from 'react'

export default function Wrapper({
  children,
  id,
  className,
}: React.PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section className={' ' + className} id={id}>
      {children}
    </section>
  )
}