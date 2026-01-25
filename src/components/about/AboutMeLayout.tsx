import classes from "./AboutMe.module.css";
import Image from 'next/image';
import profilePic from "../../../public/images/mountain-selfie.jpg";
import Container from "@/components/container/Container";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";


type AboutMeLayoutProps = {
    aboutMe: string;
};

export default function AboutMeLayout({ aboutMe }: AboutMeLayoutProps) {
    return (
        <section className={classes.aboutSection}>
            <div className={classes.profilePicWrapper}>
                <Image
                    src={profilePic}
                    alt="Photo of Jacob Candelaria in the mountains in Colorado."
                    fill
                    className={classes.profilePic}
                />

            </div>

            <h2>About Me</h2>

            <Container
                showDivider={false}
            >
                <div className={classes.aboutBody}>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {aboutMe.trim()}
                    </ReactMarkdown>
                </div>
            </Container>
        </section>
    );
}
