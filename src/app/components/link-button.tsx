'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface LinkButtonProps {
    title: string;
    path: string
}
const LinkButton: React.FC<LinkButtonProps> = ({ title, path}) => {
    const router = useRouter()
  return (
    <Button onClick={() => router.push(path)}>{title}</Button>
  )
}

export default LinkButton