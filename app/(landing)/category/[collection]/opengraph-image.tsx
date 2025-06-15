import OpengraphImage from 'app/components/opengraph-image';

export default async function Image({
  params
}: {
  params: { collection: string };
  }) {
    
  const title = params?.collection;

  return await OpengraphImage({ title });
}
