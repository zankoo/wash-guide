import { WarnIcon } from './icons';

export function Notes({ items }: { items: string[] }) {
  return <div className="notes">{items.map((text, i) => <p key={i}><WarnIcon /><span>{text}</span></p>)}</div>;
}
