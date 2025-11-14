import Form from "../components/ui/Form";
import NightSky from "../components/ui/NightSky";

function Login() {
  return (
    <>
      {/* NightSky used as immediate background for login (no flash, fewer stars, no comets) */}
      <NightSky
        visible={true}
        mode="login"
        immediate={true}
        showComets={false}
        starCount={30}
        blockInteraction={false} // allow click through to the form
      />

      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 50 }}
      >
        <Form className="pointer-events-auto" mode="login" />
      </div>
    </>
  );
}
export default Login;
