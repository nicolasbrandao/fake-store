'use client'

import classNames from 'classnames'
import { AiOutlineStar } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import { FiShoppingBag } from 'react-icons/fi'
import Brand from './common/Brand'
import { GithubStatsProvider, useGithubStats } from '../context/githubStats'

function FooterContent() {
  const { stars, forks } = useGithubStats()

  const footerClass = classNames(
    'flex',
    'flex-col',
    'w-fit',
    'md:flex-row',
    'h-[15rem]',
    'items-center',
    'justify-between',
    'py-8',
    'relative',
    'bottom-0',
    'gap-4'
  )

  const logosContainerClass = classNames(
    'flex',
    'flex-col',
    'gap-4',
    'items-center'
  )

  const apiContainerClass = classNames('flex', 'gap-2', 'items-center')

  const apiLogoWrapperClass = classNames(
    'text-3xl',
    'before:content-["{"]',
    'after:content-["}"]',
    'flex',
    'items-center',
    'gap-1'
  )

  const statsWrapperClass = classNames(
    'flex',
    'items-center',
    'justify-center',
    'gap-4'
  )

  const statsContainerClass = classNames(
    'flex',
    'items-center',
    'justify-center'
  )

  return (
    <footer className={footerClass}>
      <div className={logosContainerClass}>
        <Brand />
        <a
          className={apiContainerClass}
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className={apiLogoWrapperClass}>
            <FiShoppingBag />
          </div>
          Fake Store API
        </a>
      </div>
      <a
        href="https://github.com/nicolasbrandao/fake-store"
        target="_blank"
        rel="noreferrer"
      >
        <p>Designed & Built by Nícolas Brandão</p>
        <div className={statsWrapperClass}>
          <div className={statsContainerClass}>
            <AiOutlineStar />
            <span>{stars}</span>
          </div>
          <div className={statsContainerClass}>
            <BiGitRepoForked />
            <span>{forks}</span>
          </div>
        </div>
      </a>
    </footer>
  )
}

export default function Footer() {
  return (
    <GithubStatsProvider>
      <FooterContent />
    </GithubStatsProvider>
  )
}
