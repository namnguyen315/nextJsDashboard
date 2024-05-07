import Link from 'next/link';
import styles from './styles.module.scss';
import SelectLanguageForm from '../form/SelectLanguageForm';
import Button from './components/Button';
import { getLanguage } from '@/app/lib/fetchAPI';

export default async function Nav() {
  const mainMenu = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/' },
    { title: 'Blog', url: '/' },
    { title: 'Pages', url: '/' },
    { title: 'Contact', url: '/' },
  ];
  return (
    <div className={styles.container}>
      <ul className={styles.mainMenu}>
        {mainMenu.map((menu) => {
          return (
            <li key={menu.title}>
              <Link href={menu.url}>{menu.title}</Link>
            </li>
          );
        })}
      </ul>
      <SelectLanguageForm />
      <Button />
    </div>
  );
}
