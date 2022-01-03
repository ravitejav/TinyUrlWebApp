export interface ToasterProps {
    message: string;
    type: "info" | "success" | "warning" | "error";
    show: boolean;
}