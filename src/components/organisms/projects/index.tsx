import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { Button } from '~/components/atoms/button'
import { Grid } from '~/components/atoms/grid'
import { Heading } from '~/components/atoms/heading'
import { Text } from '~/components/atoms/text'
import { Card } from '~/components/molecules/card'
import type { HomeQuery } from '~/graphql'

const ProjectsBox = tw.section`mb-16 space-y-4`

type ProjectsSectionProperties = React.ComponentProps<React.ReactHTML['section']> & {
  data: HomeQuery['works'] | undefined
}

const ProjectsSection: React.FC<ProjectsSectionProperties> = ({ data, ...rest }) => {
  const router = useRouter()
  useEffect(() => {
    data
      ?.reverse()
      .slice(0, 4)
      .map(project => router.prefetch('/works/[id]', `/works/${project.id}`))
  }, [data])
  return (
    <ProjectsBox {...rest}>
      <Link href={'/works'} passHref>
        <Heading as={'h5'} css={tw`cursor-pointer`}>
          Works
        </Heading>
      </Link>
      <Grid css={tw`gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 my-8`}>
        <Card projects={data} />
      </Grid>
      <Link href={'/works'} passHref>
        <Button
          aria-label={'view all works'}
          as={'a'}
          variant={'icon'}
          rightIcon={'fa-solid:arrow-right'}
          boxStyles={tw`px-0`}
        >
          <Text as={'p'} css={tw`text-lg`}>
            view all works
          </Text>
        </Button>
      </Link>
    </ProjectsBox>
  )
}

export { ProjectsSection }
