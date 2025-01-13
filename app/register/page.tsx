import Link from 'next/link';
import { Form } from 'app/form2'; // Use the updated Form2 component
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from 'app/submit-button';
import Layout from '@/app/components/Layout'; // Import the Layout component

export default function Register() {
  async function register(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    // Input Validation
    if (!email || !password || !username) {
      return 'All fields are required.';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }

    // Validate password length
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    // Validate username length
    if (username.length < 3) {
      return 'Username must be at least 3 characters long.';
    }

    // Check if user already exists
    const user = await getUser(email);
    if (user) {
      return 'User already exists.';
    }

    // Create the new user
    await createUser(email, password, username);

    // Redirect to login page
    redirect('/login');
  }

  return (
    <Layout>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 text-gray-700">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign Up</h3>
            <p className="text-sm text-gray-500">
              Create an account with your email, password, and username
            </p>
          </div>

          {/* Use Form2 component here with action as register */}
          <Form action={register}>
            {/* The fields are now inside Form2, so we don't need to define them here */}
            <SubmitButton>Sign Up</SubmitButton>

            <p className="text-center text-sm text-gray-600">
              {'Already have an account? '}
              <Link href="/account/login" className="font-semibold text-gray-800">
                Sign in
              </Link>
              {' instead.'}
            </p>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
