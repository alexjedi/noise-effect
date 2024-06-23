'use client'

import {
  Component,
  Copy,
  Dribbble,
  Framer,
  Github,
  Grip,
  Linkedin,
  Star,
  TestTube,
  TestTubeDiagonal,
  Twitter,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import MagneticWrapper from '@/components/MagneticFrame'
import CustomLink from '@/components/ui/link'
import Image from 'next/image'
import profilePic from '@/app/avatar.png'
import ThreeScene from '@/components/ThreeScene'

export default function Home() {
  const { toast } = useToast()
  return (
    <main className="relative flex w-screen h-screen flex-col items-start justify-center p-24">
      <video
        src="https://videos.pexels.com/video-files/5680034/5680034-hd_1920_1080_24fps.mp4"
        className="fixed inset-0 h-screen z-0"
        muted
        loop
        autoPlay
      />
      <div className="w-full p-12 fixed flex justify-between items-center top-0 right-0 left-0">
        <CustomLink href="https://github.com/alexjedi">
          <Image
            src={profilePic}
            className="w-6 h-6 rounded-full mr-1"
            alt="Picture of the author"
          />
          <span className="text-xl font-medium ml-2">Alex Shevliakov</span>
        </CustomLink>
        <div className="flex space-x-2 items-center">
          <CustomLink href="https://magnetic-wrapper.vercel.app/performance">
            <TestTubeDiagonal size={24} strokeWidth={2} className="text-muted-foreground" />
          </CustomLink>
          <CustomLink href="https://github.com/alexjedi/magnetic-wrapper">
            <Star size={24} strokeWidth={2} className="text-muted-foreground" />
          </CustomLink>
          <CustomLink href="https://github.com/alexjedi/magnetic-wrapper">
            <Github size={24} strokeWidth={2} className="text-muted-foreground" />
          </CustomLink>
        </div>
      </div>
      <section className="w-full h-full flex items-center justify-center z-10">
        <div className="flex flex-col space-y-16">
          <div className="w-full flex flex-col items-center space-y-4">
            <h1 className='className="border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0"'>
              Noise Effect{' '}
              <Component
                size={40}
                strokeWidth={2}
                className="inline-block mr-2 text-muted-foreground"
              />
              <span className="text-muted-foreground inline-block mr-2">Component</span> and
              <Framer
                size={40}
                strokeWidth={2}
                className="inline-block mx-2 text-muted-foreground"
              />
              <span className="text-muted-foreground inline-block">Remix</span>
            </h1>
            <p className="text-3xl text-center text-muted-foreground font-medium">
              One click Copy and Paste magic effect
            </p>
          </div>
          <div className="w-full flex justify-center items-center space-x-4">
            <div className="flex flex-col space-y-3 items-center">
              <Button
                size={'xl'}
                variant="outline"
                onClick={() => {
                  toast({
                    title: 'Copied to clipboard!',
                    description: 'Create a new component and paste copied code there',
                  })
                  navigator.clipboard.writeText('')
                }}
              >
                <Copy size={20} strokeWidth={3} className="text-muted-foreground mr-2" />
                <span>Copy component</span>
              </Button>
              <p className="text-muted-foreground text-sm">for your Code project</p>
            </div>
            <div className="flex flex-col space-y-3 items-center">
              <Button
                size={'xl'}
                variant="outline"
                onClick={() => {
                  toast({
                    title: 'Copied to clipboard!',
                    description: 'Create a code override snippert and paste copied code there',
                  })
                  navigator.clipboard.writeText('')
                }}
              >
                <Copy size={20} strokeWidth={3} className="text-muted-foreground mr-2" />
                Remix Effect
              </Button>
              <p className="text-muted-foreground text-sm">for your Framer project</p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full p-12 fixed flex justify-between items-center bottom-0 right-0 left-0">
        <span className="text-lg text-muted-foreground">Please, dont forget to star the repo!</span>
        <div className="flex space-x-2 items-center">
          <CustomLink href="https://twitter.com/pxl_alexjedi">
            <Twitter size={24} className="text-muted-foreground" />
          </CustomLink>
          <CustomLink href="https://www.linkedin.com/in/alex-shelvey/">
            <Linkedin size={24} strokeWidth={2} className="text-muted-foreground" />
          </CustomLink>
          <CustomLink href="https://dribbble.com/pxlhead">
            <Dribbble size={24} strokeWidth={2} className="text-muted-foreground" />
          </CustomLink>
        </div>
      </div>
    </main>
  )
}
