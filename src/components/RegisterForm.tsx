import { User, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { AuthInput } from './AuthInput';
import { Captcha } from './Captcha';

interface RegisterFormProps {
  formData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onSubmit: (e: React.FormEvent, captchaToken: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDark: boolean;
}

export function RegisterForm({ formData, onSubmit, onChange, isDark }: RegisterFormProps) {
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'username' && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        username: 'Le nom d\'utilisateur ne doit pas dépasser 12 caractères'
      }));
    } else if (name === 'username') {
      setErrors(prev => ({
        ...prev,
        username: ''
      }));
    }

    if (name === 'password' && value.length > 16) {
      setErrors(prev => ({
        ...prev,
        password: 'Le mot de passe ne doit pas dépasser 16 caractères'
      }));
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: ''
      }));
    }

    onChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.username || errors.password) {
      return;
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <AuthInput
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username.slice(0, 12)}
            placeholder="Entrez votre nom d'utilisateur"
            Icon={User}
            onChange={handleChange}
            maxLength={12}
            isDark={isDark}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          placeholder="Entrez votre email"
          Icon={Mail}
          onChange={handleChange}
          isDark={isDark}
        />

        <div>
          <AuthInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password.slice(0, 16)}
            placeholder="Entrez votre mot de passe"
            Icon={Lock}
            onChange={handleChange}
            maxLength={16}
            isDark={isDark}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <AuthInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirmez le mot de passe"
          value={formData.confirmPassword.slice(0, 16)}
          placeholder="Confirmez votre mot de passe"
          Icon={Lock}
          onChange={handleChange}
          maxLength={16}
          isDark={isDark}
        />

        <Captcha 
          onVerify={(token) => onSubmit(new Event('submit') as unknown as React.FormEvent, token)}
          isDark={isDark}
        />
      </div>
    </form>
  );
}