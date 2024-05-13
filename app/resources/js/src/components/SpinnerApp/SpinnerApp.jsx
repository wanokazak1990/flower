import {Loader, Placeholder} from "rsuite";

export const SpinnerApp = () => {
    return (
        <div style={{position: "relative"}}>
            <Placeholder.Paragraph rows={15} />
            <Loader backdrop content="loading..." size="lg" center={true} vertical />
        </div>
    );
}
