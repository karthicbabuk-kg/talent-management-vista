import { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TreeNode {
  id: string;
  name: string;
  type: 'department' | 'designation';
  children?: TreeNode[];
  expanded?: boolean;
}

const OrganizationHierarchy = () => {
  // Sample hierarchical data
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: '1',
      name: 'Human Resources',
      type: 'department',
      expanded: true,
      children: [
        {
          id: '1-1',
          name: 'HR Director',
          type: 'designation',
          children: [
            {
              id: '1-1-1',
              name: 'HR Manager',
              type: 'designation',
              children: [
                {
                  id: '1-1-1-1',
                  name: 'HR Associate',
                  type: 'designation',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Information Technology',
      type: 'department',
      expanded: true,
      children: [
        {
          id: '2-1',
          name: 'IT Director',
          type: 'designation',
          children: [
            {
              id: '2-1-1',
              name: 'Development Manager',
              type: 'designation',
              children: [
                {
                  id: '2-1-1-1',
                  name: 'Senior Developer',
                  type: 'designation',
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const toggleNode = (nodeId: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setTreeData(updateNode(treeData));
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded;

    return (
      <div key={node.id} className="w-full">
        <div
          className={cn(
            "flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer",
            level > 0 && "ml-6"
          )}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center gap-2">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <div className="w-4" />
            )}
            <Users className="w-4 h-4" />
            <span className={cn(
              "text-sm",
              node.type === 'department' && "font-semibold"
            )}>
              {node.name}
            </span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="border-l ml-4">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Organization Hierarchy</h2>
      <div className="border rounded-lg">
        {treeData.map(node => renderTreeNode(node))}
      </div>
    </div>
  );
};

export default OrganizationHierarchy; 