import React from 'react';
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'
import { getPosts } from '../services'



export default function Home({ posts }) {

  console.log("posts: ", posts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {
            posts.sort((a,b)=>{
              return new Date(b.node.createdAt) - new Date(a.node.createdAt);
            }).map( (post, index) => (<PostCard post={post.node} key={index} />) )
          }
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];

  return{
    props: { posts }
  }
}