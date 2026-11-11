import { WarnIcon } from './icons';

export function Notes({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return <div className="notes">{items.map((text, i) => <p key={i}><WarnIcon /><span>{text}</span></p>)}</div>;
}
