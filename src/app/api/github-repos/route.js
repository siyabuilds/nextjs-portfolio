import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GH_API_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // List of repository names you want to display
    const repoNames = [
      'carbon-footprint-tracker',
      'nextjs-portfolio', 
      'word-unscrambler',
      'banking-mock'
    ];

    const username = 'siyabuilds';
    
    // Fetch data for each repository
    const repoPromises = repoNames.map(async (repoName) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repoName}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'nextjs-portfolio'
            },
            next: { revalidate: 300 }
          }
        );

        if (!response.ok) {
          console.error(`Failed to fetch ${repoName}:`, response.status);
          return null;
        }

        const repoData = await response.json();
        
        return {
          id: repoData.id,
          name: repoData.name,
          fullName: repoData.full_name,
          description: repoData.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language,
          htmlUrl: repoData.html_url,
          homepage: repoData.homepage,
          topics: repoData.topics || [],
          updatedAt: repoData.updated_at,
          createdAt: repoData.created_at,
          isPrivate: repoData.private
        };
      } catch (error) {
        console.error(`Error fetching ${repoName}:`, error);
        return null;
      }
    });

    const repos = await Promise.all(repoPromises);
    
    // Filter out any failed requests
    const validRepos = repos.filter(repo => repo !== null);

    return NextResponse.json({
      repos: validRepos,
      count: validRepos.length
    });

  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
