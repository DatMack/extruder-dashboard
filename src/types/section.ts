export interface FieldConfig {
  id: string;
  label: string;
  unit?: string;
  type: 'number' | 'text';
  placeholder?: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  fields: FieldConfig[];
  condition?: () => boolean;
}
