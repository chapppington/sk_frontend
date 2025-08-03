"use client";

import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";

interface DepartmentItem {
  name: string;
  phone: string;
  email: string;
}

interface DepartmentFormProps {
  data: DepartmentItem;
  onChange: (data: DepartmentItem) => void;
}

export function DepartmentForm({ data, onChange }: DepartmentFormProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange({ ...data, phone: formatted });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название отдела</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Название отдела"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Телефон (необязательно)</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={handlePhoneChange}
          placeholder="+7 (999) 123-45-67"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="example@company.com"
        />
      </div>
    </div>
  );
}
