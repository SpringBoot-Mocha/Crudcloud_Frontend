import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Card, { CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from './Card';
import Badge, { BadgeGroup, StatusBadge } from './Badge';
import { Plus, Search, Mail, Lock, Database, Zap, Shield } from 'lucide-react';

/**
 * Component Showcase - Demonstrates all UI components
 * Use this as a reference for implementing components in your app
 */
const ComponentShowcase = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-brand-50/30 to-accent-blue-50/30 p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-text">
            CrudCloud Premium UI
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            A modern, sophisticated design system for cloud database management
          </p>
        </div>

        {/* Buttons Section */}
        <Card variant="elevated" padding="lg">
          <CardHeader divider>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              Premium buttons with gradients, multiple variants, and interactive states
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Gradient Buttons */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Gradient Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="gradient" size="lg" icon={<Plus size={20} />}>
                    Create Instance
                  </Button>
                  <Button variant="gradient" size="md" icon={<Database size={18} />}>
                    New Database
                  </Button>
                  <Button variant="gradient" size="sm">
                    Small Action
                  </Button>
                </div>
              </div>

              {/* Primary Buttons */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Primary Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link Style</Button>
                </div>
              </div>

              {/* Status Buttons */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Status Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="success" icon={<Zap size={18} />}>
                    Deploy
                  </Button>
                  <Button variant="danger">Delete</Button>
                  <Button variant="primary" isLoading>
                    Loading...
                  </Button>
                  <Button variant="secondary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              {/* Size Variations */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Size Variations</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Input Components */}
        <Card variant="elevated" padding="lg">
          <CardHeader divider>
            <CardTitle>Input Components</CardTitle>
            <CardDescription>
              Advanced input fields with validation, icons, and floating labels
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Input */}
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                prefixIcon={<Mail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="We'll never share your email"
              />

              {/* Password Input */}
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                prefixIcon={<Lock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Input with Error */}
              <Input
                label="Database Name"
                error="This field is required"
                prefixIcon={<Database />}
                placeholder="my-database"
              />

              {/* Input with Success */}
              <Input
                label="Instance Name"
                success="Available!"
                value="prod-db-001"
                prefixIcon={<Shield />}
              />

              {/* Filled Variant */}
              <Input
                variant="filled"
                label="Search Instances"
                placeholder="Type to search..."
                prefixIcon={<Search />}
              />

              {/* Character Counter */}
              <Input
                label="Description"
                placeholder="Enter description"
                maxLength={100}
                showCharacterCount
                helperText="Maximum 100 characters"
              />

              {/* Floating Label */}
              <Input
                floatingLabel
                label="Floating Label"
                prefixIcon={<Mail />}
              />

              {/* Large Size */}
              <Input
                size="lg"
                label="Large Input"
                placeholder="Large size input"
              />
            </div>
          </CardBody>
        </Card>

        {/* Card Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default Card */}
          <Card variant="default" hoverable>
            <CardHeader divider>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Simple card with border</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-dark-600">
                This is the default card style with a subtle border and elevation.
              </p>
            </CardBody>
            <CardFooter divider>
              <Button size="sm" variant="outline">Learn More</Button>
            </CardFooter>
          </Card>

          {/* Gradient Card */}
          <Card variant="gradient" hoverable borderGradient>
            <CardHeader>
              <CardTitle gradient>Gradient Card</CardTitle>
              <CardDescription>Card with gradient background</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-dark-600">
                Premium gradient card with sophisticated styling and effects.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="primary">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Glass Card */}
          <Card variant="glass" hoverable>
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Glass morphism effect</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-dark-600">
                Modern glass effect with backdrop blur for a premium look.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="secondary">Explore</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated" hoverable interactive padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-blue-500 flex items-center justify-center">
                <Database className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-dark-900 mb-1">MySQL Database</h3>
                <p className="text-sm text-dark-600 mb-3">Production database instance</p>
                <BadgeGroup>
                  <StatusBadge status="running" />
                  <Badge variant="info" size="sm">5.7.36</Badge>
                </BadgeGroup>
              </div>
            </div>
          </Card>

          <Card variant="dark" hoverable padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Secure Connection</h3>
                <p className="text-sm text-dark-300 mb-3">SSL/TLS encryption enabled</p>
                <Badge variant="success" gradient size="sm">
                  Protected
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Badge Components */}
        <Card variant="elevated" padding="lg">
          <CardHeader divider>
            <CardTitle>Badge Components</CardTitle>
            <CardDescription>
              Status indicators and labels with dots, icons, and animations
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Status Badges */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Status Badges</h4>
                <BadgeGroup>
                  <StatusBadge status="running" />
                  <StatusBadge status="stopped" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="suspended" />
                  <StatusBadge status="error" />
                </BadgeGroup>
              </div>

              {/* Colored Badges */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Variant Colors</h4>
                <BadgeGroup>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="dark">Dark</Badge>
                </BadgeGroup>
              </div>

              {/* Gradient Badges */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Gradient Badges</h4>
                <BadgeGroup>
                  <Badge variant="primary" gradient>Premium</Badge>
                  <Badge variant="success" gradient>Verified</Badge>
                  <Badge variant="info" gradient>Pro</Badge>
                  <Badge variant="danger" gradient>Critical</Badge>
                </BadgeGroup>
              </div>

              {/* Badges with Icons */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">With Icons</h4>
                <BadgeGroup>
                  <Badge variant="primary" icon={<Database size={14} />}>
                    Database
                  </Badge>
                  <Badge variant="success" icon={<Zap size={14} />}>
                    Fast
                  </Badge>
                  <Badge variant="info" icon={<Shield size={14} />}>
                    Secure
                  </Badge>
                </BadgeGroup>
              </div>

              {/* Size Variations */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Size Variations</h4>
                <div className="flex items-center gap-3">
                  <Badge size="sm" variant="primary">Small</Badge>
                  <Badge size="md" variant="primary">Medium</Badge>
                  <Badge size="lg" variant="primary">Large</Badge>
                </div>
              </div>

              {/* Removable Badges */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Removable Badges</h4>
                <BadgeGroup>
                  <Badge variant="primary" removable onRemove={() => console.log('Removed')}>
                    React
                  </Badge>
                  <Badge variant="success" removable onRemove={() => console.log('Removed')}>
                    Node.js
                  </Badge>
                  <Badge variant="info" removable onRemove={() => console.log('Removed')}>
                    TypeScript
                  </Badge>
                </BadgeGroup>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Color Palette */}
        <Card variant="elevated" padding="lg">
          <CardHeader divider>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              Brand colors and accent colors used throughout the design system
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Brand Colors */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Brand Purple</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="space-y-1">
                      <div className={`h-16 rounded-lg bg-brand-${shade} shadow-sm`} />
                      <p className="text-xs text-center font-mono text-dark-600">{shade}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradients */}
              <div>
                <h4 className="text-sm font-semibold text-dark-700 mb-3">Gradient Examples</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 shadow-brand" />
                  <div className="h-24 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-blue-600 shadow-lg" />
                  <div className="h-24 rounded-xl bg-gradient-to-br from-accent-emerald-600 to-accent-emerald-500 shadow-lg" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
};

export default ComponentShowcase;
