import aboutMe from "../../data/about_me.json";
import classes from "./AboutMe.module.css";
import Image from 'next/image';
import profilePic from "../../../public/images/mountain-selfie.jpg";
import Container from "@/components/container/Container";


export default function AboutMeLayout() {

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
                    {aboutMe.AboutMe.trim()
                        .split(/\n\s*\n/)         // split on blank lines (real paragraphs)
                        .map((paragraph, i) => (
                            <p key={i}>{paragraph.trim()}</p>
                        ))}
                </div>
            </Container>
        </section>
    );
}
