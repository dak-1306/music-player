import MainLayout from "../components/layout/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </MainLayout>
  );
}
export default NotFound;
