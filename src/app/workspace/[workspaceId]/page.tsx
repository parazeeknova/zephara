interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const { workspaceId } = await params;
  return (
    <div>
      <h1>WorkspaceIdPage</h1>
      <p>Workspace ID: {workspaceId}</p>
    </div>
  );
};

export default WorkspaceIdPage;
