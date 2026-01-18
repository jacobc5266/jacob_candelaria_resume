'use client'
import classes from './navbar.module.css';
import {useLayoutEffect, useRef} from "react";
import {usePathname} from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const update = () => {
            const height = nav.offsetHeight;
            document.documentElement.style.setProperty("--nav-height", `${height}px`);
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(nav);

        return () => ro.disconnect();
    }, []);

    return (
        <nav ref={navRef} className={classes.nav}>
            <ul>
                <li><Link href="/" className={`${classes.link} ${pathname === "/" ? classes.active : ""}`}>Home</Link></li>
                <li><Link href="/experience" className={`${classes.link} ${pathname === "/experience" ? classes.active : ""}`}>Experience</Link></li>
                <li><Link href="/projects" className={`${classes.link} ${pathname === "/projects" ? classes.active : ""}`}>Projects</Link></li>
                <li><Link href="/about" className={`${classes.link} ${pathname === "/about" ? classes.active : ""}`}>About</Link></li>
                <li><Link href="/contact" className={`${classes.link} ${pathname === "/contact" ? classes.active : ""}`}>Contact</Link></li>
            </ul>
        </nav>
    );
}