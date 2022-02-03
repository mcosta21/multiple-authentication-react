import { ReactNode } from "react";
import './styles.css';

interface Props {
    children: ReactNode;
}

export default function BodyRouter({ children }: Props){
    return <div className="body-router">{children}</div>
}