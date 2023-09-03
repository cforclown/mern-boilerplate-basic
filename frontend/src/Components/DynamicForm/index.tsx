
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateFormDefaultValues, generateFormFields, generateFormSchema } from './DynamicForm.service';
import { IMetadataField } from '@/Utils/metadata';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
export interface IDynamicForm<T> {
  fields: IMetadataField<T>[];
}

function DynamicForm<T>({ fields }: IDynamicForm<T>): JSX.Element {
  const formSchema = useMemo(() => generateFormSchema(fields), [fields]);
  
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: generateFormDefaultValues(fields),
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {generateFormFields(form, fields)}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default DynamicForm;
