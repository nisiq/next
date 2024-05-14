import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

export default function TagNames({ value, onChange }) {

  return (
    <div className="w-full">
      <TagsInput
        value={value}
        onChange={onChange}
      />
      <em className="text-xs text-slate-400	">Press enter para adicionar novo integrante</em>
    </div>
  );
}