export default function getHighlightedText() { 
    if (window.getSelection) {
        let text = window.getSelection().toString();
        console.log(text);
        return text;
    }
}