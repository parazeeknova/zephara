'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { SignInFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#121212]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <motion.div
          className="relative flex h-full w-full items-center justify-center border-white/10 md:w-[35%] md:border-r"
          initial={false}
          animate={{
            x: state === 'signIn' ? 0 : '-100%',
            opacity: state === 'signIn' ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="/"
            className="absolute top-6 left-6 flex items-center rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            <span>Back to Zephyr</span>
          </motion.a>

          <div className="w-full max-w-[350px] p-6">
            <h2 className="mb-2 font-semibold text-2xl text-white">
              Sign in to Zephara
            </h2>
            <p className="mb-6 text-base text-white/60">
              Welcome back! Enter your credentials to access your chat
              conversations.
            </p>

            <AnimatePresence mode="wait">
              {state === 'signIn' && (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <SignInCard setState={setState} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden h-full w-[65%] bg-center bg-cover md:block"
          style={{ backgroundImage: "url('/auth-bg-signin.png')" }}
          initial={false}
          animate={{
            opacity: state === 'signIn' ? 1 : 0,
            x: state === 'signIn' ? 0 : '100%',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[6px]" />
        </motion.div>

        <motion.div
          className="absolute right-0 flex h-full w-full items-center justify-center border-white/10 md:w-[35%] md:border-l"
          initial={false}
          animate={{
            x: state === 'signUp' ? 0 : '100%',
            opacity: state === 'signUp' ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="/"
            className="absolute top-6 right-6 flex items-center rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <span>Back to Zephyr</span>
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </motion.a>

          <div className="w-full max-w-[350px] p-6">
            <h2 className="mb-2 font-semibold text-2xl text-white">
              Join Zephara
            </h2>
            <p className="mb-6 text-base text-white/60">
              Create an account to start messaging and connect with others
              instantly.
            </p>

            <AnimatePresence mode="wait">
              {state === 'signUp' && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <SignUpCard setState={setState} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-0 hidden h-full w-[65%] bg-center bg-cover md:block"
          style={{ backgroundImage: "url('/auth-bg-signup.png')" }}
          initial={false}
          animate={{
            opacity: state === 'signUp' ? 1 : 0,
            x: state === 'signUp' ? 0 : '-100%',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[6px]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50 bg-black"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
