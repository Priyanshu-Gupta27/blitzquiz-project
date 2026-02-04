import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Ready to compete?</h2>
                    <p className={styles.ctaSubtitle}>Create a free account and start competing today.</p>
                    <Link href="/auth/signup" className={styles.ctaButton}>
                        Create Account
                    </Link>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.container}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyright}>
                            © {new Date().getFullYear()} blitzquiz
                        </div>

                        <div className={styles.credit}>
                            build by rajneesh
                        </div>

                        <div className={styles.footerLinks}>
                            <Link href="/contests" className={styles.fLink}>Contests</Link>
                            <Link href="/leaderboard" className={styles.fLink}>Leaderboard</Link>
                            <Link href="/about" className={styles.fLink}>About</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
