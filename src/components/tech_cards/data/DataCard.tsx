import classes from "../TechCard.module.css";
import Container from "../../container/Container.tsx";
import {PythonIcon} from "../backend/PythonIcon.tsx";

export default function DataCard() {

    return (
        <div className={classes.languages_card}>
            <div>
                <h2>Backend</h2>
            </div>
            <Container className={classes.languages_card}>
                <div className={classes.language_row}>
                    <Container className={classes.icon_container}>
                        <PythonIcon width={75} height={75}/>
                    </Container>
                </div>

            </Container>
        </div>
    );
}