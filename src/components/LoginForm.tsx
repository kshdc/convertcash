import { User, Lock } from 'lucide-react';
import { AuthInput } from './AuthInput';
import { Captcha } from './Captcha';

interface LoginFormProps {
  formData: {
    username: string;
    password: string;
  };
  onSubmit: (e: React.FormEvent, captchaToken: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDark: boolean;
}

export function LoginForm({ formData, onSubmit, onChange, isDark }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <AuthInput
          id="username"
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          placeholder="Entrez votre nom d'utilisateur"
          Icon={User}
          onChange={onChange}
          isDark={isDark}
        />
        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          placeholder="Entrez votre mot de passe"
          Icon={Lock}
          onChange={onChange}
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