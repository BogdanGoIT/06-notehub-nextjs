type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotesDetails(props: Props) {
  const { id } = await props.params;
  console.log(id);

  return <div>Notes Details{id}</div>;
}
