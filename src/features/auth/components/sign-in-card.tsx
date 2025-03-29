import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import type { SignInFlow } from '../types';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full space-y-4">
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => {}}
          variant="outline"
          size="default"
          className="relative w-full justify-center border-[#333] bg-transparent py-5 text-white transition-colors duration-200 hover:bg-[#222] hover:text-white"
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <FcGoogle className="mr-2 size-5" />
          </motion.div>
          Sign in with Google
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => {}}
          variant="outline"
          size="default"
          className="relative w-full justify-center border-[#333] bg-transparent py-5 text-white transition-colors duration-200 hover:bg-[#222] hover:text-white"
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <FaGithub className="mr-2 size-5" />
          </motion.div>
          Sign in with Github
        </Button>
      </motion.div>

      <div className="flex items-center gap-2 py-2">
        <Separator className="flex-1 bg-[#333]" />
        <span className="text-[#777] text-xs">OR</span>
        <Separator className="flex-1 bg-[#333]" />
      </div>

      <form className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="email" className="mb-1 text-white text-xs">
            Email*
          </label>
          <motion.div whileFocus={{ scale: 1.01 }}>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              required
              className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
            />
          </motion.div>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="mb-1 text-white text-xs">
            Password*
          </label>
          <motion.div whileFocus={{ scale: 1.01 }}>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              required
              className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
            />
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full bg-neutral-700 text-white transition-all duration-200 hover:bg-neutral-600"
          >
            Sign in
          </Button>
        </motion.div>
      </form>

      <div className="flex items-center justify-center gap-2 pt-4">
        <p className="text-[#777] text-sm">Don&apos;t have an account?</p>
        <motion.button
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setState('signUp')}
          className="font-medium text-sm text-white transition-all duration-200 hover:underline"
        >
          Create account →
        </motion.button>
      </div>
    </div>
  );
};
