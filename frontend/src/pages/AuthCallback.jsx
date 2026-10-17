import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [error, setError] = useState(() =>
    token ? '' : 'Google sign-in failed. No token received.'
  );

  useEffect(() => {
    if (!token) return;

    loginWithToken(token)
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        setError('Google sign-in failed. Please try again.');
      });
  }, [token, loginWithToken, navigate]);

  return (
    <section className="section page-top">
      <div className="container auth-wrap">
        <div className="auth-card">
          {error ? (
            <>
              <h1>Sign-in error</h1>
              <p className="form-error">{error}</p>
              <a className="btn btn--primary" href="/login">
                Back to login
              </a>
            </>
          ) : (
            <>
              <h1>Signing you in…</h1>
              <p className="muted">Finishing Google authentication.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
