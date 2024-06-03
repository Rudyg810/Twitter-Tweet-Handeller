import { CardContent, CardHeader, Card, CardTitle, CardDescription } from '@/components/ui/card';
import config from '@/context/config';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Hashtag {
  _id: string;
  ip: string;
  tags: string[];
}

const Display = () => {
  const [history, setHistory] = useState<Hashtag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${config.port}/api/hashtags/getall`);
        setHistory(res?.data?.hashtags);
        console.log(">>>>>>>>>>>");
        console.log(res.data);
        console.log(">>>>>>>>>>>");
      } catch (e) {
        console.log(e);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="mt-10 sm:mx-40">
      {history.length >= 1 ? (
        <>
          <Label>Previous Results</Label>
          <div className="flex flex-wrap">
            {history.map((item) => (
              <div key={item._id} className="flex flex-wrap w-fit card">
                <Card className={cn("w-[380px]")}>
                  <CardHeader>
                    <CardTitle>
                      Each Twitter Trends <span className="text-sm">{item._id}</span>
                      <br />
                      <span className="text-sm">{item.ip}</span>
                    </CardTitle>
                    <CardDescription>You have top Trends now</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {item.tags && item.tags.map((tag, index) => (
                      <Label key={index}>{tag}</Label>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Label>No history available</Label>
      )}
    </div>
  );
};

export default Display;
