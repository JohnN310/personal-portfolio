import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const project = getProject((await params).slug); return project ? { title: project.title, description: project.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const project = getProject((await params).slug); if (!project) notFound(); return <CaseStudyPage project={project}/>; }
