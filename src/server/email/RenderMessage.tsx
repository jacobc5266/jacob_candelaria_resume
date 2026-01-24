export default function renderMessage(message: string) {
    const paragraphs = message.split(/\n{2,}/);
    return paragraphs.map((paragraph, idx) => (
        <p key={idx} style={{ margin: "0 0 12px 0" }}>
            {paragraph.split(/\n/).map((line, lineIdx, lines) => (
                <span key={lineIdx}>
                    {line}
                    {lineIdx < lines.length - 1 ? <br /> : null}
                </span>
            ))}
        </p>
    ));
}
