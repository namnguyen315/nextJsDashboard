'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hook';
import {
  setLang,
  setLangSuccess,
  setLangFailed,
} from '@/lib/features/language/languageSlice';

export default function SelectLanguageForm() {
  const language = useAppSelector((state) => state.language);
  const disPatch = useAppDispatch();

  const handleSelectValue = (value: string) => {
    disPatch(setLangSuccess(value));
  };
  return (
    <Select value={language.lang} onValueChange={handleSelectValue}>
      <SelectTrigger
        value={language.lang}
        className="ml-[37vw] w-[150px] rounded-2xl bg-white shadow-[0px_4px_4px_0px_#0000000d]"
      >
        <SelectValue placeholder={'Language'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="rounded-2xl">
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Tiếng Việt">Tiếng Việt</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
