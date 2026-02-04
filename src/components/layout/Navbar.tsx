'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Github, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
                        blitzquiz
                    </Link>
                </div>

                <div className={styles.center}>
                    <Link href="/contests" className={styles.navLink}>Contests</Link>
                    <Link href="/leaderboard" className={styles.navLink}>Leaderboard</Link>
                </div>

                <div className={styles.right}>
                    <div className={styles.icons}>
                        <button className={styles.iconBtn}>
                            <Github size={18} />
                        </button>
                        <button
                            className={styles.iconBtn}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
                            {!mounted && <Sun size={18} />}
                        </button>
                    </div>

                    <div className={styles.auth}>
                        <Link href="/auth/signin" className={styles.signIn}>Sign In</Link>
                        <Link href="/auth/signup" className={styles.signUp}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
