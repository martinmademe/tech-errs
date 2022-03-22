const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <header>
      <h1>tech-errs.</h1>
    </header>
    {children}
  </>
);

export default Layout;