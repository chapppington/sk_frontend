"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/shadcn/card";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";

interface FooterAddressManagerProps {
  address: string;
  onChange: (address: string) => void;
}

export function FooterAddressManager({
  address,
  onChange,
}: FooterAddressManagerProps) {
  const [localAddress, setLocalAddress] = useState(address);

  // Синхронизируем локальное состояние с пропсами
  useEffect(() => {
    console.log('FooterAddressManager: Address prop changed to:', address);
    setLocalAddress(address);
  }, [address]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('FooterAddressManager: Address input changed to:', e.target.value);
    setLocalAddress(e.target.value);
  };

  const handleSave = () => {
    console.log('FooterAddressManager: Saving address:', localAddress);
    onChange(localAddress);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Адрес компании</CardTitle>
        <CardDescription>
          Укажите адрес, который будет отображаться в меню
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="footer-address">Адрес</Label>
            <Textarea
              id="footer-address"
              value={localAddress}
              onChange={handleAddressChange}
              placeholder="г. Москва, ул. Примерная, д. 123, офис 456"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>Сохранить адрес</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
