import Link from 'next/link';
import { Form } from 'app/form';
import { signIn } from 'app/auth';
import { SubmitButton } from 'app/submit-button';
import Layout from '@/app/components/Layout';
import { redirect } from 'next/navigation';

export default function Login() {
  return (
    <Layout>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 text-gray-700">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Use your email and password to sign in
            </p>
          </div>
          <Form
            action={async (formData: FormData) => {
              'use server';
              try {
                const result: { user?: { username?: string } } = await signIn('credentials', {
                  redirectTo: '/account',
                  email: formData.get('email') as string,
                  password: formData.get('password') as string,
                });

                if (result?.user?.username) {
                  redirect(`/account/${result.user.username}`);
                }
                redirect('/login');
              } catch (error) {
                console.error('Login failed:', error);
                redirect('/login?error=1');
              }
            }}
          >
            <SubmitButton>Sign in</SubmitButton>
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/register" className="font-semibold text-gray-800">
                Sign up
              </Link>
              {' here.'}
            </p>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
