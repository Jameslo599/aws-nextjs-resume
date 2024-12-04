import { Resource } from 'sst';
import Form from '@/components/Form';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <div className="w-full h-h-full min-h-screen">
      <main className="bg-slate-900 w-32">
        <Form url={url} />
      </main>
    </div>
  );
}
