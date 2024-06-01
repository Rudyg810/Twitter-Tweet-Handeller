import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/context/config";
import { io } from "socket.io-client";
import {

  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/context/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";


const Home = () => {
const navigate = useNavigate()
  const [status, setStatus] = useState('');
  const [history,setHistory] = useState({})
  const {userId} = useAuthContext();
  const [responseContent, setResponseContent] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const newSocket = io(`${config.port}/frontend`, {
      path: "/socket.io/",
      reconnectionAttempts: 1,
      reconnectionDelay: 10000,
    });
    newSocket.on("connect", () => {
      console.log("Connected to the frontend namespace:", newSocket.id);
    });
    const fetchTags = async()=>{
      try{
     const res = await axios.get(`${config.port}/hashtags/user/${userId || jwtDecode<any>(localStorage.getItem('auth') as string)?.userId}`)
      await setHistory(res?.data?.hashtags);
      console.log(">>>>>>>>>>>")
      console.log(history)
      console.log(">>>>>>>>>>>")
      }
      catch(e){
        console.log(e)
      }
 
    }
    newSocket.on("disconnect", () => {
      console.log("Disconnected from the frontend namespace");
    });

    newSocket.on('status', (data) => {
      console.log("fjienkndkolwnjfvnjk")
let id = (jwtDecode(localStorage.getItem('auth') as string) as any)?.userId;
      if(data.userId.toString()===id.toString()){
        console.log(`Status Updated: ${data.description}`.toString());
        setStatus(data.description);
      }
      else{
        console.log(`${data.userId}`.toString()===`${userId}`.toString())
      }

    });

    newSocket.on('response', (data) => {
      console.log("fjienkndkolwnjfvnjk")
let id = (jwtDecode(localStorage.getItem('auth') as string) as any)?.userId;

      if(data.userId.toString()===id.toString()){
        console.log(`Response has Arrived: ${data.description}`);
      setResponseContent(data.description);
      setLoading(false)
      }else{
        console.log(`${data.userId}`.toString()===`${userId}`.toString())

      }
    });
    fetchTags();

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const [inputValue, setInputValue] = useState('');

  const handleAutomation = async () => {
    setLoading(true)
    const res = await axios.get('https://api.ipify.org?format=json');
    console.log(inputValue);
    try {
      const response = await axios.post(`${config.port}/api/automate/${userId}`, { ip: `${res.data.ip}` });
      console.log('Automation response:', response.data);
    } catch (error) {
      console.error('Error during automation:', error);
      setLoading(false)
      navigate("/secret-keys")
      toast({
        title:"Please Update your Credentials first"
      })
    }
  };

  return (
    <div>
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex w-full h-auto min-h-32 mx-auto items-center justify-center p-6">
                    <div className="text-center w-full">
                      <span className="block mx-auto mb-4">
                        <div className="flex mx-auto justify-center">
                          <img
                            className="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px]"
                            src="https://img.icons8.com/fluency/48/twitter.png"
                            alt="twitter"
                          />
                          <div className="text-lg sm:text-3xl ml-5 my-auto font- w-fit font-semibold">
                            Get your trends back
                          </div>
                        </div>
                        <div className="text-blue-500 italic font- sm:pl-80 pl-8">
                          #twitter
                        </div>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full  rounded-lg  justify-center flex-wrap mt-10 flex sm:justify-evenly">
        <div className="p-2 justify-center">
          <Label>Choose your trend type:</Label>
          <div className="justify-center mt-5">
            <div className="flex items-center space-x-2 mt-3">
              <input
                type="radio"
                value="default"
                id="r1"
                name="trendType"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <input
                type="radio"
                value="comfortable"
                id="r2"
                name="trendType"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <input
                type="radio"
                value="compact"
                id="r3"
                name="trendType"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </div>
        </div>

        <div onClick={handleAutomation} className="sm:ml-10 mt-5 flex justify-center items-center">
          <Button className="rounded-none font-">Start the Automation</Button>
        </div>
        {loading && <div className="sm:ml-10 w-[200px] p-2">
          <Label>Check the Running Status</Label>
          <br/>
          <Label>         
             {status?<Label>{status}...</Label>:<Spinner/>}
</Label>
        </div>}
        <div className="mt-10 mb-10 sm:my-0 ">
    {responseContent &&     <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>Twitter Trends</CardTitle>
        <CardDescription>You have top Trends now</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">

      {responseContent && responseContent?.map((tag, index) => (
            <Label key={index}>{tag}</Label>
          ))}
      </CardContent>
      </Card>}

      
      </div>
      
      </div>
<div className=" mt-10 sm:mx-40">
{(history as any).length >= 1 ? (
  <>
    <Label>Previous Results</Label>
  <div className="flex flex-wrap">
    {(history as any).map((item:any) => (
      <div key={item._id} className=" flex flex-wrap  w-fit card">
        <Card className={cn("w-[380px]")}>
          <CardHeader>
            <CardTitle>Each Twitter Trends <span className="text-sm">{item._id}</span>
            <br/>
            <span className="text-sm">{item.ip}</span></CardTitle>
            <CardDescription>You have top Trends now</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {item.tags && item.tags.map((tag:any, index:any) => (
              <Label key={index}>{tag}</Label>
            ))}
          </CardContent>
        </Card>
      </div>
    ))}</div>
  </>
) : (
  <Label className="">No history available</Label>
)}

</div>
      <div>
      <div>
    </div>
    </div>
    </div>
  );
};

export default Home;
