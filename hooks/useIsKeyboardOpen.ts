import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useIsKeyboardOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onShow = () => setIsOpen(true);
    Keyboard.addListener('keyboardWillShow', onShow);

    const onHide = () => setIsOpen(false);
    Keyboard.addListener('keyboardWillHide', onHide);

    return () => {
      // @ts-ignore
      Keyboard.removeListener && Keyboard.removeListener('keyboardWillHide');
      // @ts-ignore
      Keyboard.removeListener && Keyboard.removeListener('keyboardWillShow');
    };
  });

  return isOpen;
};
